<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/custom/veeder/templates/navigation/menu--main.html.twig */
class __TwigTemplate_0a297ad78db0d672288f7096a28cab47c817a96e969d7c08d6ed147af4619d9b extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["import" => 23, "macro" => 31, "if" => 33, "set" => 41, "for" => 42];
        $filters = ["escape" => 36, "length" => 43, "raw" => 51];
        $functions = ["link" => 54];

        try {
            $this->sandbox->checkSecurity(
                ['import', 'macro', 'if', 'set', 'for'],
                ['escape', 'length', 'raw'],
                ['link']
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 23
        $context["menus"] = $this;
        // line 24
        echo "
";
        // line 29
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($context["menus"]->getmenu_links(($context["items"] ?? null), ($context["attributes"] ?? null), 0));
        echo "

";
    }

    // line 31
    public function getmenu_links($__items__ = null, $__attributes__ = null, $__menu_level__ = null, ...$__varargs__)
    {
        $context = $this->env->mergeGlobals([
            "items" => $__items__,
            "attributes" => $__attributes__,
            "menu_level" => $__menu_level__,
            "varargs" => $__varargs__,
        ]);

        $blocks = [];

        ob_start();
        try {
            // line 32
            echo "  ";
            $context["menus"] = $this;
            // line 33
            echo "  ";
            if (($context["items"] ?? null)) {
                // line 34
                echo "
    ";
                // line 35
                if ((($context["menu_level"] ?? null) == 0)) {
                    // line 36
                    echo "      <ul";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["attributes"] ?? null)), "html", null, true);
                    echo " class=\"menu-top-level\">
    ";
                } else {
                    // line 38
                    echo "      <ul>
    ";
                }
                // line 40
                echo "
      ";
                // line 41
                $context["count"] = 0;
                // line 42
                echo "      ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable(($context["items"] ?? null));
                foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
                    // line 43
                    echo "        ";
                    if ((((($context["menu_level"] ?? null) == 1) && $this->getAttribute($context["item"], "below", [])) && (twig_length_filter($this->env, ($context["items"] ?? null)) >= 3))) {
                        // line 44
                        echo "          ";
                        if ((($this->getAttribute($context["item"], "below", []) && (($context["menu_level"] ?? null) == 1)) && (((($context["count"] ?? null) % 2) == 0) || (($context["count"] ?? null) == 0)))) {
                            // line 45
                            echo "            <div class=\"list-wrapper\">
              <div class=\"list-part\">
          ";
                        }
                        // line 48
                        echo "            <li";
                        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "attributes", [])), "html", null, true);
                        echo ">
              ";
                        // line 49
                        $context["link_title"] = (("<span>" . $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "title", []))) . "</span>");
                        // line 50
                        echo "              ";
                        ob_start();
                        // line 51
                        echo "                ";
                        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed(($context["link_title"] ?? null)));
                        echo "
              ";
                        $context["link_text"] = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
                        // line 53
                        echo "
              ";
                        // line 54
                        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->getLink($this->sandbox->ensureToStringAllowed(($context["link_text"] ?? null)), $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "url", []))), "html", null, true);
                        echo "
              ";
                        // line 55
                        if ($this->getAttribute($context["item"], "below", [])) {
                            // line 56
                            echo "                ";
                            if ((($context["menu_level"] ?? null) == 0)) {
                                // line 57
                                echo "                  <div class=\"drop-down\">
                    ";
                                // line 58
                                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($context["menus"]->getmenu_links($this->getAttribute($context["item"], "below", []), ($context["attributes"] ?? null), (($context["menu_level"] ?? null) + 1)));
                                echo "
                  </div>
                ";
                            } else {
                                // line 61
                                echo "                  ";
                                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($context["menus"]->getmenu_links($this->getAttribute($context["item"], "below", []), ($context["attributes"] ?? null), (($context["menu_level"] ?? null) + 1)));
                                echo "
                ";
                            }
                            // line 63
                            echo "              ";
                        }
                        // line 64
                        echo "            </li>
          ";
                        // line 65
                        $context["count"] = (($context["count"] ?? null) + 1);
                        // line 66
                        echo "          ";
                        if ((($this->getAttribute($context["item"], "below", []) && (($context["menu_level"] ?? null) == 1)) && ((($context["count"] ?? null) % 2) == 0))) {
                            // line 67
                            echo "              </div>
            </div>
          ";
                        }
                        // line 70
                        echo "        ";
                    } else {
                        // line 71
                        echo "          <li";
                        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "attributes", [])), "html", null, true);
                        echo ">
            ";
                        // line 72
                        $context["link_title"] = (("<span>" . $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "title", []))) . "</span>");
                        // line 73
                        echo "            ";
                        ob_start();
                        // line 74
                        echo "              ";
                        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed(($context["link_title"] ?? null)));
                        echo "
            ";
                        $context["link_text"] = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
                        // line 76
                        echo "
            ";
                        // line 77
                        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->getLink($this->sandbox->ensureToStringAllowed(($context["link_text"] ?? null)), $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "url", []))), "html", null, true);
                        echo "
            ";
                        // line 78
                        if ($this->getAttribute($context["item"], "below", [])) {
                            // line 79
                            echo "              ";
                            if ((($context["menu_level"] ?? null) == 0)) {
                                // line 80
                                echo "                <div class=\"drop-down\">
                  ";
                                // line 81
                                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($context["menus"]->getmenu_links($this->getAttribute($context["item"], "below", []), ($context["attributes"] ?? null), (($context["menu_level"] ?? null) + 1)));
                                echo "
                </div>
              ";
                            } else {
                                // line 84
                                echo "                ";
                                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($context["menus"]->getmenu_links($this->getAttribute($context["item"], "below", []), ($context["attributes"] ?? null), (($context["menu_level"] ?? null) + 1)));
                                echo "
              ";
                            }
                            // line 86
                            echo "            ";
                        }
                        // line 87
                        echo "          </li>
        ";
                    }
                    // line 89
                    echo "      ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 90
                echo "    </ul>
  ";
            }
        } catch (\Exception $e) {
            ob_end_clean();

            throw $e;
        } catch (\Throwable $e) {
            ob_end_clean();

            throw $e;
        }

        return ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/navigation/menu--main.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  241 => 90,  235 => 89,  231 => 87,  228 => 86,  222 => 84,  216 => 81,  213 => 80,  210 => 79,  208 => 78,  204 => 77,  201 => 76,  195 => 74,  192 => 73,  190 => 72,  185 => 71,  182 => 70,  177 => 67,  174 => 66,  172 => 65,  169 => 64,  166 => 63,  160 => 61,  154 => 58,  151 => 57,  148 => 56,  146 => 55,  142 => 54,  139 => 53,  133 => 51,  130 => 50,  128 => 49,  123 => 48,  118 => 45,  115 => 44,  112 => 43,  107 => 42,  105 => 41,  102 => 40,  98 => 38,  92 => 36,  90 => 35,  87 => 34,  84 => 33,  81 => 32,  67 => 31,  60 => 29,  57 => 24,  55 => 23,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/navigation/menu--main.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\navigation\\menu--main.html.twig");
    }
}

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

/* themes/custom/veeder/templates/layout/page.html.twig */
class __TwigTemplate_ce2f17f90a35ba198d438ee110d4eb496f44a9b9c4227547c40c1176331886b7 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 64, "for" => 68];
        $filters = ["t" => 44, "escape" => 46, "replace" => 69, "trim" => 69, "upper" => 69];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'for'],
                ['t', 'escape', 'replace', 'trim', 'upper'],
                []
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
        // line 41
        echo "<div id=\"wrapper\">
  <div class=\"main-container\">
   <div class=\"overlay\"></div>
    <header id=\"header\" class=\"main-header\" role=\"banner\" aria-label=\"";
        // line 44
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar(t("Site header"));
        echo "\">
      <div class=\"container d-flex justify-content-between align-items-center border-bottom\">
        ";
        // line 46
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "header_logo", [])), "html", null, true);
        echo "
        <a href=\"javascript:void(0)\" class=\"hamburger\"> <span>";
        // line 47
        echo "</span> </a>
        <div class=\"navigation\">
            ";
        // line 49
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "secondary_menu", [])), "html", null, true);
        echo "
            ";
        // line 50
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "primary_menu", [])), "html", null, true);
        echo "
        </div>
      </div>

      <div id=\"mobilenav\" class=\"hidden-md-up\">                    
          <div id=\"menu\">                        
            <div class=\"menu-outer\">
              ";
        // line 57
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_menu", [])), "html", null, true);
        echo "
              ";
        // line 58
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "primary_menu", [])), "html", null, true);
        echo "
            </div>
          </div>
      </div>

      ";
        // line 64
        echo "      ";
        if ( !twig_test_empty(($context["jump_menu"] ?? null))) {
            // line 65
            echo "        <div class=\"page-sub-nav hidden-sm-down\">
          <div class=\"container\">
            <ul>
              ";
            // line 68
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["jump_menu"] ?? null));
            foreach ($context['_seq'] as $context["i"] => $context["menus"]) {
                // line 69
                echo "                <li><a href=\"#";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, twig_replace_filter(twig_trim_filter($this->sandbox->ensureToStringAllowed($context["menus"])), " ", "-"), "html", null, true);
                echo "\">";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, twig_replace_filter(twig_upper_filter($this->env, twig_trim_filter($this->sandbox->ensureToStringAllowed($context["menus"]))), "-", " "), "html", null, true);
                echo "</a></li>
              ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['i'], $context['menus'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 71
            echo "            </ul>
          </div>
          <span class=\"tri-color\"></span>
        </div>
      ";
        }
        // line 75
        echo "  
    </header>
    <div class=\"header-space\"></div>

    ";
        // line 79
        if ($this->getAttribute(($context["page"] ?? null), "highlighted", [])) {
            // line 80
            echo "      <div class=\"highlighted\">
        <div class=\"container\">
          ";
            // line 82
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "highlighted", [])), "html", null, true);
            echo "
        </div>
      </div>
    ";
        }
        // line 86
        echo "
    ";
        // line 87
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_first", [])) {
            // line 88
            echo "      <div id=\"sidebar-first\" class=\"column sidebar\">
        <div class=\"container\">
          ";
            // line 90
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_first", [])), "html", null, true);
            echo "
        </div>
      </div>
    ";
        }
        // line 94
        echo "
    <a id=\"main-content\" tabindex=\"-1\"></a>

    ";
        // line 97
        if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_display_contact_sidebar", []), 0, []), "value", []) == 1)) {
            // line 98
            echo "      <div class=\"sidebar-wrap\">
        <div class=\"side-bar\">
          <div class=\"bar-wrap\">            
             ";
            // line 101
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_menu", [])), "html", null, true);
            echo "            
          </div>
        </div>
        <div class=\"dist-locat-sec\">
          <div class=\"container\">
            <div class=\"dl-wrap\">
              ";
            // line 108
            echo "              ";
            if ($this->getAttribute(($context["page"] ?? null), "form_sidebar_first", [])) {
                // line 109
                echo "                ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "form_sidebar_first", [])), "html", null, true);
                echo "
              ";
            }
            // line 111
            echo "
              ";
            // line 113
            echo "              ";
            if ($this->getAttribute(($context["page"] ?? null), "form_sidebar_second", [])) {
                // line 114
                echo "                ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "form_sidebar_second", [])), "html", null, true);
                echo "
              ";
            }
            // line 116
            echo "            </div>
          </div>
        </div>
      </div>
    ";
        }
        // line 121
        echo "
    ";
        // line 122
        if ( !(null === ($context["node_type"] ?? null))) {
            // line 123
            echo "      ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "content", [])), "html", null, true);
            echo "
    ";
        } else {
            // line 125
            echo "      <div class=\"main-content\">
        <div class=\"container\">
          ";
            // line 127
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "content", [])), "html", null, true);
            echo "
        </div>
      </div>
    ";
        }
        // line 131
        echo "
    ";
        // line 132
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_second", [])) {
            // line 133
            echo "      <div id=\"sidebar-second\" class=\"column sidebar\">
        <div class=\"container\">
          ";
            // line 135
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_second", [])), "html", null, true);
            echo "
        </div>
      </div>
    ";
        }
        // line 139
        echo "    
    ";
        // line 141
        echo "    <footer class=\"main-footer space-medium\">
        <div class=\"container\">
            ";
        // line 143
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_first", [])), "html", null, true);
        echo "
          <div class=\"footer-right\">
            ";
        // line 145
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_second", [])), "html", null, true);
        echo "
            ";
        // line 146
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_third", [])), "html", null, true);
        echo "
          </div>
          ";
        // line 148
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer", [])), "html", null, true);
        echo "
        </div>
    </footer>
  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/layout/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  272 => 148,  267 => 146,  263 => 145,  258 => 143,  254 => 141,  251 => 139,  244 => 135,  240 => 133,  238 => 132,  235 => 131,  228 => 127,  224 => 125,  218 => 123,  216 => 122,  213 => 121,  206 => 116,  200 => 114,  197 => 113,  194 => 111,  188 => 109,  185 => 108,  176 => 101,  171 => 98,  169 => 97,  164 => 94,  157 => 90,  153 => 88,  151 => 87,  148 => 86,  141 => 82,  137 => 80,  135 => 79,  129 => 75,  122 => 71,  111 => 69,  107 => 68,  102 => 65,  99 => 64,  91 => 58,  87 => 57,  77 => 50,  73 => 49,  69 => 47,  65 => 46,  60 => 44,  55 => 41,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/layout/page.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\layout\\page.html.twig");
    }
}
